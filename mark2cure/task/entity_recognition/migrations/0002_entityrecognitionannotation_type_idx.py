# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-11-30 13:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entity_recognition', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='entityrecognitionannotation',
            name='type_idx',
            field=models.IntegerField(blank=True, choices=[(0, b'Disease'), (1, b'Gene'), (2, b'Treatment')], null=True),
        ),
    ]