def UUIDEncoder(data):
        data["postid"]=str(data["postid"])
        data["forum_id"]=str(data["forum_id"])
        data=popstate(data)
        return data

def popstate(data):
        data.pop("_state")
        return data