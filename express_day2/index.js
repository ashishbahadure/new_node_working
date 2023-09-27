var express=require('express');
var app=express();
app.get("/",function(req,res){
    // obj={
    //     "student_name":'ashish',
    //     "student_mobile":"9112992097"
    // // }
    // arr=['ashish','ram','rushi','kiran']
    // obj={'arr':arr}

    arrobj=[
        {'student_name':'ashish',"mobile":"911233"},
        {'student_name':"ram",'mobile':'911223344'}
    ];
    obj={'student_data':arrobj}
    res.render("home1.ejs",obj);
    
})
app.listen(1000);