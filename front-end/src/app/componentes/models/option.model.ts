export class Option {
    id: String;
    name: String;
    photo: String;
    organization: String;
    role:String;

    constructor(id: String,name: String,photo: String,organization: String,role:String){
      this.id=id;
      this.name=name;
      this.photo=photo;
      this.organization=this.organization;
      this.role = role;
    }

  }