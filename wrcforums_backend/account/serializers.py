from rest_framework import serializers
from .models import *

class UserAuthenticationSerializer(serializers.ModelSerializer):
    passwordconfirm=serializers.CharField(style={"input_type":"password"},write_only=True) 
    class Meta:
        model=User
        fields=["email","username","password","passwordconfirm"]
        extra_kwargs={
            'password':{'write_only':True}
        }
    def validate(self,args):
        password=args.get('password')
        passwordconfirm=args.get('passwordconfirm')
        if password!=passwordconfirm:
            raise serializers.ValidationError("passwords dont match")
        return args
    
    def validate_password(self,value):
        if len(value)<8:
            raise serializers.ValidationError("password must be at least 8 characters long")
        return value
        
    def create(selfs,validated_data):
        return User.objects.create_user(**validated_data)

class LoginAuthenticateSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=200) #have written this manually beacuase the default email will check for uniqueness and raise error which should be avoided in case of login
    class Meta:
        model=User
        fields=["email","password"]

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","email","username","is_admin"]

class ChangePasswordSerializer(serializers.ModelSerializer):
        password=serializers.CharField(style={"input_type":"password"},write_only=True) 
        passwordconfirm=serializers.CharField(style={"input_type":"password"},write_only=True) 
        class Meta:
            model=User
            fields=["password","passwordconfirm"]
        
        def validate(self,attrs):
            if attrs.get('password')!=attrs.get('passwordconfirm'):
                raise ValidationError({"msg":"passwords dont match"})
            user=self.context.get('user')
            user.set_password(attrs.get('password'))
            user.save()
            return attrs

class ProfileDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields='__all__'

class NotificationsSerializer(serializers.ModelSerializer):
    class  Meta:
        model=Notifications
        fields='__all__'

class ForumsSerializer(serializers.ModelSerializer):
    class  Meta:
        model=Forums
        fields='__all__'

class NoticeSerializer(serializers.ModelSerializer):
    class  Meta:
        model=Notice
        fields='__all__'

class PostsSerializer(serializers.ModelSerializer):
    class  Meta:
        model=Content
        fields='__all__'
        depth=1



