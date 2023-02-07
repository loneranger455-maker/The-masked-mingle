from django.db.models.signals import post_save
from django.dispatch import receiver
from account.models import User
from .models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user_instance=instance)