#!/usr/bin/env python
# coding: utf-8

import os
import site
import sys
import tornado
import tornado.template
import socket
from sys import executable as pythonbin
from tornado.options import define, options
from handlers.error import ErrorHandler

# make filepaths relative to settings.
ROOT = os.path.dirname(os.path.abspath(__file__))
path = lambda *a: os.path.join(ROOT, *a)

# save original Python path
old_sys_path = list(sys.path)

# add local packages directories to Python's site-packages path
site.addsitedir(path('handlers'))  # Request handlers

# add local dependencies
if os.path.exists(path('lib')):
    for directory in os.listdir(path('lib')):
        full_path = path('lib/%s' % directory)
        if os.path.isdir(full_path):
            site.addsitedir(full_path)

# move the new items to the front of sys.path
new_sys_path = []
for item in list(sys.path):
    if item not in old_sys_path:
        new_sys_path.append(item)
        sys.path.remove(item)
sys.path[:0] = new_sys_path

# port defined as heroku deploy
define("port",
    default=5000,
    type=int,
    help=("Server port")
    )
define("config",
    default=None,
    help=("Tornado configuration file")
    )
define('debug',
    default=True,
    type=bool,
    help=("Turn on autoreload, log to stderr only")
    )

tornado.options.parse_command_line()

# Temporary alternative to define app URL
def getHostIp():
    hip = ''
    if 'vagrant' in pythonbin:
        hip = 'localhost'
    else:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        s.connect(('<broadcast>', 0))
        hip = s.getsockname()[0]
    return hip

appdir = os.path.dirname(os.path.realpath(__file__))

# Keys can be generated with hashlib and must be changed before deploy
# Example:
#
# import hashlib
# hashlib.sha256('sample').hexdigest()

# config settings
config = {}
config['debug'] = options.debug
config['cookie_secret'] = '303e16bb8f9eb223d989fce3970052e63fdf30777e4fd53a014cbd1d581228f2'
config['xsrf_cookies'] = True
config['app_path'] = appdir
config['default_handler_class'] = ErrorHandler
config['default_handler_args'] = dict(status_code=404)
config['version'] = 'webapp version 0.1'
config['static_path'] = os.path.join(appdir, "static")
config['template_path'] = os.path.join(appdir, "templates")
config['autoescape'] = None

# Setting URL
ENV = os.environ.get("ENVIRONMENT","local")
if ENV == 'heroku':
    appurl = 'http://linc-webapp.venidera.net'
    #newrelic.agent.initialize('newrelic.ini','staging')
else:
    #newrelic.agent.initialize(os.path.dirname(appdir)+'/newrelic.ini','staging')
    appurl = "http://" + str(getHostIp()) + ":" + str(options.port)

config['url'] = appurl



