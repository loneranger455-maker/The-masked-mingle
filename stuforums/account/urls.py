from django.urls import path,include
from .views import *
urlpatterns=[
    path('auth/',UserAuthenticationViews.as_view()),
    path('login/',LoginAuthenticationViews.as_view()),
    path('details/',UserDetailsView.as_view()),
    path('changepassword/',ChangePasswordView.as_view()),
    path('joinedforums/',Joinedforums.as_view()),
    path('getnotifications/',GetNotifications.as_view()),
    path('profiledetails/',ProfileDetailsViews.as_view()),
    path('forums/',ForumsViews.as_view()),
    path('notices/',NoticeViews.as_view()),
    path('posts/<uuid:pk>/',PostView.as_view()),
    path('joinforum/<uuid:pk>/',Joinforumviews.as_view()),
    path('addcomment/<uuid:pk>/',AddCommentView.as_view()),
    path('getuserpost/',GetMyPostsViews.as_view()),
    path('alljoinedforums/',JoinedforumsView.as_view()),
    path('myforums/',MyForums.as_view()),
    path('forumdetails/<uuid:pk>/',ForumDetailsView.as_view()),
    path('createforums/',ForumDetailsView.as_view()),
    path('allforums/',AllForums.as_view()),

    path('allposts/',GetPostsView.as_view()),

]
