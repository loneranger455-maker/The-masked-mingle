from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
from django.contrib.postgres.fields import ArrayField
import datetime,uuid
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserManager(BaseUserManager):
    def create_user(self, email, username,password=None,passwordconfirm=None):
       
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
           
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(
            email,
            username=username,
            password=password
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    username=models.CharField(verbose_name='username',
        max_length=255,
        unique=True,)
    password=models.CharField(max_length=100)
    account_created=models.DateField(auto_now_add=True,blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','password']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
            "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
            return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        #"Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    

class Notifications(models.Model):
    notification_for=models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    notification_data=models.CharField(max_length=100,default=None)


class Forums(models.Model):
    forumid=models.UUIDField(unique=True,default=uuid.uuid4,primary_key=True)
    admin=models.ForeignKey(User, on_delete=models.CASCADE)
    forum_name=models.CharField(max_length=100,unique=True)
    image=models.ImageField(default=None)
    description=models.TextField(default=None)
    members=models.IntegerField(default=1)
    privacy=models.CharField(max_length=200,default="public")
    created_date=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return self.forum_name

class UserProfile(models.Model):
    user_instance=models.OneToOneField(User,on_delete=models.CASCADE)
    joined_forums=ArrayField(models.CharField(max_length=100),null=True)
    user_profile_picture=models.ImageField(upload_to="profile_pictures/",default='profile_pictures/user-profile-icon.png')
    recent_interactions=ArrayField(ArrayField(models.CharField(max_length=200),size=2,null=True),null=True)


class Notice(models.Model):
    notice_for=models.ForeignKey(Forums, on_delete=models.CASCADE)
    notice_data=models.CharField(max_length=200)
    posted_data=models.DateTimeField(auto_now_add=True,blank=True)



class Posts(models.Model):
    forum=models.ForeignKey(Forums,on_delete=models.CASCADE)
    posted_by=models.ForeignKey(User,on_delete=models.CASCADE)
    comments=ArrayField(ArrayField(models.CharField(max_length=100),size=2),default=list)
    likes=models.IntegerField(default=0)

class Content(Posts):
    postid=models.UUIDField(unique=True,default=uuid.uuid4,primary_key=True)
    title=models.CharField(max_length=200)
    contentvalue=models.TextField()
    link=models.CharField(max_length=200,default="",blank=True)
    post_type=models.CharField(max_length=200,blank=True)
    def __str__(self):
        return str(self.postid)

