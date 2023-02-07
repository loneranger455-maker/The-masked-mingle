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
    path('post/',PostView.as_view()),

]
