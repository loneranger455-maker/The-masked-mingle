from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status,serializers
from rest_framework.response import Response 
from django.contrib.auth import authenticate
from .models import *
from .serializers import *
from .public_fuctions import get_profile_image_for_comment
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderer
import json
from .UUIDEncoder import UUIDEncoder,popstate

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
                if user.check_password(password):
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
        Notice_Array=[{"notice_for":i.notice_for.forum_name,"notice_data":i.notice_data} for i in objects]
      
        return Response(Notice_Array)

class PostView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
 
    def get(self,request,pk):
        serializeddata=Content.objects.get(postid=pk)
        username=serializeddata.posted_by.username
        serializeddata=UUIDEncoder(serializeddata.__dict__)
        serializeddata["comments"]=get_profile_image_for_comment(serializeddata["comments"])
        serializeddata.update({"username":username})
        
        

        return Response(serializeddata)

class GetPostsView(APIView):
    def get(self,request):
        requiredvalues=Content.objects.all().values("forum","postid","posted_by","title","contentvalue","comments","likes")
        requiredvalues=[{"forum":Forums.objects.get(forumid=i["forum"]).forum_name,
        "posted_by":User.objects.get(id=i["posted_by"]).username,"postid":i["postid"],"title":i["title"],"content":i["contentvalue"],"comments_count"
        :len(i["comments"]),"likes":i["likes"]
        } for i in requiredvalues]
        return Response(requiredvalues)
        
        


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
        
        return Response("Some Error occured")

class Joinedforums(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        objectval=UserProfile.objects.get(user_instance=request.user)
        
        if objectval.joined_forums!=None:
            return Response(objectval.joined_forums)
        else:
            return Response([""])


class JoinedforumsView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        forumslist=UserProfile.objects.get(user_instance=request.user).joined_forums
        finallist=[Forums.objects.get(forum_name=i) for i in forumslist]
       
        

        if forumslist!=None:
            return Response(ForumsSerializer(finallist,many=True).data)
        else:
            return Response([""])

class AddCommentView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def post(self,request,pk):
        objectall=Content.objects.get(postid=pk)
        username=objectall.posted_by.username
        objectall.comments.append([request.user.username,request.data["comment"]])
        objectall.save()
        serializeddata=UUIDEncoder(objectall.__dict__)
        serializeddata["comments"]=get_profile_image_for_comment(serializeddata["comments"])
        serializeddata.update({"username":username})

        return Response(serializeddata)

class GetMyPostsViews(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        requiredvalues=Content.objects.filter(posted_by=request.user).values("forum","postid","title","contentvalue","comments","likes")
        requiredvalues=[{"forum":Forums.objects.get(forumid=i["forum"]).forum_name,"postid":str(i["postid"]),"title":i["title"],"content":i["contentvalue"],"comments_count"
        :len(i["comments"]),"likes":i["likes"]
        } for i in requiredvalues]
        return Response(requiredvalues)


class ForumDetailsView(APIView):
    def get(self,request,pk):
        forumobj=Forums.objects.get(forumid=pk)
        noticesobj=[popstate(i.__dict__) for i in Notice.objects.filter(notice_for=forumobj)]
        postsobj=[popstate(i.__dict__) for i in Content.objects.filter(forum=forumobj)]

        finalobj={
            "forumdetails":popstate(forumobj.__dict__),
            "notices":noticesobj,
            "postobj":postsobj,
        }

        return Response(finalobj)
    
    def post(self,request):
        serializeddata=ForumsSerializer(data=request.data)
        if serializeddata.is_valid(raise_exception=True):
            serializeddata.save({"admin":request.user})
        return JsonResponse({"msg","Forums created successfully"})
