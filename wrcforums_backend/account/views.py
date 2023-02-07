from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status,serializers
from rest_framework.response import Response 
from django.contrib.auth import authenticate
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class UserAuthenticationViews(APIView):
    renderer_classes=[UserRenderer]
    def get(self,request):
        return Response({"msg":"dats is fetched"})
    def post(self,request):
        
        serializeddata=UserAuthenticationSerializer(data=request.data)
        if serializeddata.is_valid(raise_exception=True):
            user=serializeddata.save()

            token=get_tokens_for_user(user)
            Notifications(notification_for=user,notification_data=" Welcome to our community.Hope you like it here.").save()
            return Response({"token":token,"msg":"registration completed sucessfully"},status=status.HTTP_201_CREATED)
        
        return Response({"msg":"data is invalid"},status=status.HTTP_400_BAD_REQUEST)

class LoginAuthenticationViews(APIView):
    renderer_classes=[UserRenderer]

    def post(self,request):
        serializeddata=LoginAuthenticateSerializer(data=request.data)
        if serializeddata.is_valid(raise_exception=True):
            email=serializeddata.data.get('email')
            password=serializeddata.data.get('password')
            print(email+password)
            try:
                user=User.objects.get(email=email)
            except:
                user=None
            

            if user is not None:
                if user.password==password:
                    token=get_tokens_for_user(user)
                    
                    return Response({"token":token,"username":user.username,"msg":"user registration sucessfull"},status=status.HTTP_200_OK)
                else:
                    return Response({"errors":{"password":["Password is incorrect"]}},status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"errors":{"email":["User with this email doesn't exists"]}},status=status.HTTP_400_BAD_REQUEST)
        return Response(serializeddata.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserDetailsView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        print(request.user.username)
        serializer=UserDetailsSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data)

class ChangePasswordView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializeddata=ChangePasswordSerializer(data=request.data,context={"user":request.user})
        if serializeddata.is_valid(raise_exception=True):
            return Response({"msg":"password changed sucessfully"},status=status.HTTP_200_OK)
        return Response(serializeddata.errors,status=status.HTTP_400_BAD_REQUEST)



class GetNotifications(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        allobject=Notifications.objects.filter(username=request.user.username)
        array=[i.notify for i in allobject]
        return Response(array)
    
class ProfileDetailsViews(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        data=UserProfile.objects.get(user_instance=request.user)
        serializeddata=ProfileDetailsSerializer(data)
        return Response(serializeddata.data)

class ForumsViews(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        serializer=ForumsSerializer(request.user)   
        return Response(serializer.data)

class NoticeViews(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        objects=Notice.objects.all()
        serializer=NoticeSerializer(objects,many=True)
        return Response(serializer.data)

class PostView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def post(self,request):
        # _mutable=request.data._mutable
        # request.data._mutable=True
        forum=Forums.objects.get(forum_name=request.data["forum"])

        # request.data["posted_by"]=request.user
        # request.data._mutable=_mutable

        serialized_data=PostsSerializer(data=request.data)
        if serialized_data.is_valid(raise_exception=True):
                    serialized_data.save(posted_by=request.user,forum=forum)
                    return Response("Sucessfully saved")
        
        return Response("Sucessfully saved")

class Joinedforums(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        print(request.user)
        objectval=UserProfile.objects.get(user_instance=request.user)
        if objectval.joined_forums!=None:
            return Response(objectval.joined_forums)
        else:
            return Response([""])




