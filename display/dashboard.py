from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, session
)
from flask.globals import current_app
from werkzeug.exceptions import abort

from . import models
from flask_restful import Resource, reqparse


class Panel(Resource):
    def get(self):
        if session['token'] is None:
            return 403
        user = current_app.session.query(models.User).filter(models.User.id == session['user_id']).one_or_none()
        if user is None:
            return 500
            # return all panels
        return {
            'panels': user.panels
        }
        



# bp = Blueprint('dashboard', __name__)

# panel_info = [
#     {
#         'type': 'stream',
#         'display_name': 'Stream Display',
#         'settings': [
#             {
#                 'display_name': 'Title',
#                 'name': 'title',
#                 'type': 'text'
#             },
#             {
#                 'display_name': 'Url',
#                 'name': 'url',
#                 'type': 'text'
#             }
#         ]
#     }
# ]

# @bp.route('/')
# @login_required
# def index():
#     print(g.user)
#     panels = g.user.panels
#     print(len(panels))
#     return render_template('dashboard/index.html', panels=panels, panel_info=panel_info)

# @bp.route('/add-panel', methods=('POST',))
# @login_required
# def add_panel():
#     panel_type = request.form['panel-type']

#     panel = models.Panel(panel_type=panel_type)
#     g.user.panels.append(panel)

#     settings = list(filter(lambda x: x['type'] == panel_type, panel_info))[0]['settings']
#     for setting in settings:
#         name = setting['name']
#         value = request.form[name]
#         setting = models.Setting(key=name, value=value)

#         panel.settings.append(setting)
    
#     current_app.session.add(panel)
#     current_app.session.commit()

#     return redirect('index')
