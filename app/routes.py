#!/usr/bin/env python
# coding: utf-8

from handlers.base import VersionHandler
from handlers.error import ErrorHandler
from handlers.auth import AuthHandler
from handlers.main import MainHandler,LoginHandler,HomeHandler,SideMenuHandler,\
    NewLionHandler,SearchLionHandler,NewImageSetHandler,SearchImageSetHandler,\
    ConservationistsHandler,ImageGalleryHandler,LocationHistoryHandler,\
    EditMetadataHandler,CVResultsHandler,CVRefineHandler
from handlers.api import ImageSetsListHandler,OrganizationsListHandler

# Defining routes
url_patterns = [
    # Handlers for the website
    (r"/", MainHandler),
    (r"/version", VersionHandler),
    (r"/login", LoginHandler),
    (r"/home", HomeHandler),
    (r"/sidemenu", SideMenuHandler),
    (r"/newlion", NewLionHandler),
    (r"/searchlion", SearchLionHandler),
    (r"/newimageset", NewImageSetHandler),
    (r"/searchimageset", SearchImageSetHandler),
    (r"/conservationists", ConservationistsHandler),
    (r"/imagegallery", ImageGalleryHandler),
    (r"/locationhistory", LocationHistoryHandler),
    (r"/metadata", EditMetadataHandler),
    (r"/cvresults", CVResultsHandler),
    (r"/cvrefine", CVRefineHandler),

    # Handlers for API comunication
    (r"/imagesets/list", ImageSetsListHandler),
    (r"/organizations/list", OrganizationsListHandler)

]
