export interface Billboard{
    id:string;
    label:string;
    imageUrl:string;
}

export interface Category {
    id:string;
    name:string;
    billboard: Billboard;
}

export interface Product {
    id:string;
    category:Category;
    name:string;
    price:string;
    isFeatured:boolean;
    author:Author;
    publisher:Publisher;
    images: Image[];
    description:string;
}

export interface Image{
    id:string;
    url:string;
}

export interface Author{
    id:string;
    name:string;
    value:string;
}

export interface Publisher{
    id:string;
    name:string;
    value:string;
}


export interface User{
    email: String;
    password: String;
    name: String;
    cpf: String;
    phone: String;
}