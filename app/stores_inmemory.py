import itertools
import copy


class BaseStore():

    def __init__(self, data_provider, last_id):
        self._data_provider = data_provider
        self._last_id = last_id

    def get_all(self):
        return self._data_provider

    def add(self, item_instance):
        item_instance.id = self._last_id
        self._data_provider.append(item_instance)
        self._last_id += 1

    def get_by_id(self, id):
        all_instances = self.get_all()
        result = None
        for instance in all_instances:
            if instance.id == id:
                result = instance
                break
        return result

    def update(self, instance):
        all_instances = self.get_all()
        for index, current_instance in enumerate(all_instances):
            if current_instance.id == instance.id:
                all_instances[index] = instance
                break

    def delete(self, id):
        instance_to_delete = self.get_by_id(id)
        self._data_provider.remove(instance_to_delete)

    def entity_exists(self, instance):
        result = True
        if self.get_by_id(instance.id) is None:
            result = False
        return result


class MemberStore(BaseStore):

    members = []
    last_id = 1

    def __init__(self):
        super().__init__(MemberStore.members, MemberStore.last_id)

    def get_by_name(self, name):
        all_members = self.get_all()
        return (member for member in all_members if member.name == name)

    def get_members_with_posts(self, posts):
        members = self.get_all()
        members = copy.deepcopy(self.get_all())
        for member, post in itertools.product(members, posts):
            if post.member_id == member.id:
                member.posts.append(post)
        return members

    def get_top_two(self, post_store):
        all_member = self.get_members_with_posts(post_store)
        sorted_member = sorted(all_member, key=lambda x: len(x.posts), reverse=True)
        return sorted_member[:10]


class PostStore(BaseStore):

    posts = []
    last_id = 1

    def __init__(self):
        super().__init__(PostStore.posts, PostStore.last_id)

    def get_posts_by_date(self):
        all_posts = self.get_all()
        sorted_posts = sorted(all_posts, key=lambda x: x.date, reverse=True)
        return sorted_posts
