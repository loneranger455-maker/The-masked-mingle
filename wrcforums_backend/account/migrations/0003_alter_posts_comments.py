# Generated by Django 4.1.5 on 2023-02-07 18:27

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_posts_comments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='comments',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), size=2), default=[''], size=None),
        ),
    ]
