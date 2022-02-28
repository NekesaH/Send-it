from flask_restx import Namespace, Resource,fields
from models import Slist
from flask import request
from flask_jwt_extended import jwt_required

  
posts_ns = Namespace('posts', description="Namespace for posts")

slist_model =posts_ns.model(
    "Slist", 
    {
        "id":fields.Integer(),
        "title":fields.String(),
        "description": fields.String()
    }

)


@posts_ns.route('/lists')
class SlistsResource(Resource):

    @posts_ns.marshal_list_with(slist_model)
    def get(self): 
        """Get all lists"""
        slists = Slist.query.all()
        return slists

        
    @posts_ns.marshal_with(slist_model)
    @posts_ns.expect(slist_model)
    @jwt_required
    def post(self):
        data = request.get_json()
        new_list = Slist(
            title=data.get('title'),
            description=data.get('description')
        )
        new_list.save()

        return new_list,201
        

@posts_ns.route('/lists/<int:id>')
class SlistResource(Resource):
    @posts_ns.marshal_with(slist_model)
    def get(self, id):
        lists = Slist.query.get_or_404(id)
        return lists


    @posts_ns.marshal_with(slist_model)
    @jwt_required
    def put(self, id):
        """update recipe"""
        new_update = Slist.query.get_or_404(id)

        data = request.get_json()

        new_update.update(data.get('title'), data.get('description'))

        return new_update


    @posts_ns.marshal_with(slist_model)
    @jwt_required
    def delete(self, id):
        """Delete"""
        
        s_delete = Slist.query.get_or_404(id)
        s_delete.delete()

        return s_delete
