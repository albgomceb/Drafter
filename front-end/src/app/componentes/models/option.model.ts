export class Option {
    id: String;
    name: String;
    username: String;
    photo: String;
    organization: String;
    role:String;

    constructor(id: String,name: String,photo: String,organization: String,role:String,username: String){
      this.id=id;
      this.name=name;
      this.username=username;
      this.photo=photo;
      this.organization=organization;
      this.role = role;
    }

  }