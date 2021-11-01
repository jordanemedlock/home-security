from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from display.auth import login_required

bp = Blueprint('dashboard', __name__)

@bp.route('/')
@login_required
def index():
    return render_template('dashboard/index.html')
