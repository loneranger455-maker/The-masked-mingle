from .models import *
def get_profile_image_for_comment(allcomments):
        for x in allcomments:
            print(x[0])
            x.append(str(UserProfile.objects.get(user_instance=
            User.objects.get(username=x[0])).user_profile_picture))
        return allcomments