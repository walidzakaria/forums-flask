from flask import render_template, request, redirect, url_for
from app import models
from app import app, post_store


@app.route("/")
@app.route("/index")
def home():
    return render_template("index.html", posts=post_store.get_all())


@app.route("/topic/add", methods=["GET", "POST"])
def topic_add():
    if request.method == "POST":
        new_post = models.Post(request.form["title"], request.form["content"])
        post_store.add(new_post)
        return redirect(url_for("home"))
    else:
        return render_template("topic_add.html")


@app.route("/topic/delete/<int:id>")
def topic_delete(id):
    post_store.delete(id)
    return redirect(url_for("home"))


@app.route("/topic/view/<int:id>")
def topic_view(id):
    return render_template("topic_view.html", post=post_store.get_by_id(id))


@app.route("/topic/update/<int:id>", methods=["GET", "POST"])
def topic_edit(id):
    if request.method == "GET":
        return render_template("topic_update.html", post=post_store.get_by_id(id))
    else:
        updated_post = models.Post(request.form["title"], request.form["content"])
        post_store.update(updated_post)
        return redirect(url_for("home"))