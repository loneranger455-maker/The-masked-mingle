# The Masked Mingle
The Masked Mingle is a unique online platform where people can interact and communicate with others while keeping their identities a secret.

## What You Can Do on The Masked Mingle
### Create Posts: 
You can write and share your thoughts in different discussion groups. You can even include links and choose different types of posts.

### Engage and Appreciate:
You can leave comments on posts that others have shared and show your approval by giving posts a thumbs-up.

### Discover New Topics: 
You can search for and join new discussion groups to explore various topics and connect with people who share your interests.

### Private and Public Spaces:
You have the option to create both private and public discussion groups. You decide who can see and participate in your conversations.

### Stay Informed:
If you're in charge of a discussion group, you can create notices that everyone in the group will see.

### Personalize Your Profile: 
You can manage your profile to reflect your interests and find others who have similar likes.




### Tech Stack

**Client:** React, Redux-Toolkit, TailwindCSS

**Server:** Django, Rest

**Database:** PostgreSQL

## How to Run

### Frontend

1. Clone the repository:
```bash
git clone https://github.com/loneranger455-maker/The-masked-mingle.git
```

2. Navigate to the frontend directory:
```bash
cd The-masked-mingle/frontend
```

4. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```
The frontend should now be accessible at `http://localhost:3000`.

### Backend

1. Navigate to the backend directory:
```
cd The-masked-mingle/the_masked_mingle
```

2. Create a virtual environment (recommended) and activate it.

3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Set up the PostgreSQL database and update the database configuration in `settings.py`.

5. Run migrations:
```bash
python manage.py migrate
```
6. Run the server:
```bash
python manage.py runserver
```


The backend should now be running at `http://localhost:8000`.
