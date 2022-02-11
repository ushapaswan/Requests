var fs=require('fs');
const sr=require('readline-sync');
var axios=require('axios');
var url ="https://api.merakilearn.org/courses";
axios.get(url)
.then(resp =>{
    let data=(resp.data)
    let my_json1=JSON.stringify(data,null,4)
    fs.writeFileSync("saral_data.json",my_json1)
    serial_no=1
    for(i of data){
        console.log(serial_no,i["name"],i["id"])
    serial_no=serial_no+1}
    courses_no=sr.question('enter the course number:-')
    let id=data[courses_no-1]['id']
    console.log(data[courses_no-1]['name'],id)
    saral_api1=("https://api.merakilearn.org/courses"+String(id)+"/exercises")
    api_data2= axios.get(saral_api1)
    .then(resp =>{
        let data_2=resp.data
        let my_json2=JSON.stringify(data_2,null,4)

        fs.writeFileSync('saral_data2.json',my_json2)
        var serial_no_2=1
        var topic_list =[]
        for (j of data_2["data"]){
            if (j["childExercises"].length ==0){
                    console.log(" ",serial_no_2,".",j["name"])
                    console.log("    ","-",j["slug"])
                    topic_list.push(j["name"])
                    // topic_list.push(j["sl)
                    serial_no_2+=1                 
            }else{
                let serial_no_3=1
                console.log(" ",serial_no_2,".",j["name"])
                topic_list.push(j['name'])
                for (index3 of j["childExercises"]){
                    console.log("     ",serial_no_3,"-",index3["name"])
                    serial_no_3+=1}
            serial_no_2+=1}} 
            // console.log(topic_list) 
            let slug=sr.question("enter the parent number:-")
            console.log("       ",slug,topic_list[slug-1])
            if (data_2["data"][slug-1]["childExercises"].length==0){
                console.log("     ","-",data_2["data"][slug-1]["slug"])
            
                ques=sr.question("enter slug number:-")
                new_one=("http://saral.navgurukul.org/api/courses/"+String(data[courses_no-1]["id"])+"/exercise/getBySlug?slug="+String(data_2["data"][slug-1]["slug"]))
                new_one_link=axios.get(new_one)
                .then(resp =>{
                    let api4=resp.data
                    let file4=JSON.stringify(api4,null,4)
                    fs.writeFileSync("question1.json",file4)
                    console.log(api4["content"])
            })
            }
            else{
        
            data_2["data"][slug-1]["childExercises"].length != 0
            var s=1
            for (question of  data_2["data"][slug-1]["childExercises"]){
                console.log("        ",s,question["name"])
                    s++
            }
                    
                        
    serial_no_2+=1
    var ques=sr.question("enter question number:-")
    var last_link=("http://saral.navgurukul.org/api/courses/"+String(data[courses_no-1]["id"])+"/exercise/getBySlug?slug="+String(data_2["data"][slug-1]["childExercises"][ques-1]["slug"]))
    last_link_api=axios.get(last_link)
    .then(resp=>{
        let api3=resp.data
        let file3=JSON.stringify(api3,null,4)
        fs.writeFileSync("QUESTIONS.json",file3)
        console.log(api3["content"])
    })

}


    })
    
})