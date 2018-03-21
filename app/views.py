from flask import render_template, request, redirect, url_for, jsonify, abort
from app import models
from app import app, post_store


@app.route("/")
@app.route("/index")
def home():
    return render_template("index.html", posts=post_store.get_all())


@app.route("/topic/add")
def topic_add():
    return render_template("topic_add.html")


@app.route("/topic/delete/<int:id>")
def topic_delete(id):
    try:
        post_store.delete(id)
    except ValueError:
        abort(404)

    return redirect(url_for("home"))


@app.route("/topic/show/<int:id>")
def topic_show(id):
    post_to_view = post_store.get_by_id(id)
    if post_to_view is None:
        abort(404, "Couldn't find this topic!")

    return render_template("topic_show.html")


@app.route("/topic/update/<int:id>")
def topic_update(id):
    return render_template("topic_update.html")


@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html", message=error.description)