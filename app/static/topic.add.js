$(function () {
        $("form").submit(function (event) {
            event.preventDefault();
            var topicTitle = $("input[name='title']").val();
            var topicContent = $("input[name='content']").val();

            var topicData = {
                "title": topicTitle,
                "content": topicTitle
            };
            $.ajax({
                type: "POST",
                url: "/api/topic/add",
                data: JSON.stringify(topicData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function ()
                {
                    alert("added topic successfully!");
                    window.location.href = "/";
                }
            });
        });
    });