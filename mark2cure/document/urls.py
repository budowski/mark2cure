from django.conf.urls import patterns, include, url

from rest_framework import routers

from . import views

router = routers.DefaultRouter()

urlpatterns = patterns('',

    # Pubtator BioC File for PMID
    url(r'^pubtator/(?P<pubmed_id>\d+).(?P<format_type>\w+)$',
        views.read_pubtator_bioc, name='read-pubtator-bioc'),

    # BioC File for PMID (basic / no annotations)
    url(r'^(?P<pubmed_id>\d+).(?P<format_type>\w+)$',
        views.read_pubmed_bioc, name='read-pubmed-bioc'),

    # BioC File for Partner for Task & PMID Paring
    # Score in BioC File?
    url(r'^(?P<task_pk>\d+)/(?P<doc_pk>\d+)/results.(?P<format_type>\w+)$',
        views.identify_annotations_results_bioc, name='results-bioc'),

    # View results (only if new)
    url(r'^(?P<task_id>\d+)/(?P<doc_id>\d+)/results/$',
        views.identify_annotations_results, name='results'),

    # "API" Endpoint to submit Document Annotations
    url(r'^(?P<task_pk>\d+)/(?P<section_pk>\d+)/annotation/$',
        views.identify_annotations_submit, name='create'),

    # (TODO ???) Task submission (moved to common?)
    url(r'^(?P<task_id>\d+)/(?P<doc_id>\d+)/submit/$',
        views.submit, name='submit'),

    # REST Framework
    url('^(?P<doc_id>\d+)/section/(?P<section_id>\d+)/user/(?P<user_id>\d+)/annotations/$',
        views.AnnotationViewSet.as_view()),
    url(r'^', include(router.urls)),
)
