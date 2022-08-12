/*
    description: a class named GameLogic includes action, findOut, stepback, decision and warning several methods.
    developer: Eric.
*/

class GameLogic {
    
    constructor(){
    this.checkerboard=[["rv","rh","re","ro","rt","ro","re","rh","rv"],
    ["","","","","","","","",""],
    ["","rc","","","","","","rc",""],
    ["rw","","rw","","rw","","rw","","rw"],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["bw","","bw","","bw","","bw","","bw"],
    ["","bc","","","","","","bc",""],
    ["","","","","","","","",""],
    ["bv","bh","be","bo","bt","bo","be","bh","bv"]];
    this.lastCheckerboard=[];
    }
    
    stepback(){
        if (this.lastCheckerboard.length==0)
            return false;
        this.checkerboard=[];
        for (let i=0; i < this.lastCheckerboard.length; i++)
            this.checkerboard.push(this.lastCheckerboard[i].slice());
        this.lastCheckerboard=[];
        return true;
    }
    
    action(id,chess_piece,location,act,size){
        this.lastCheckerboard=[];
        for (let i=0; i < this.checkerboard.length; i++)
            this.lastCheckerboard.push(this.checkerboard[i].slice());
        let status=0;
        let targetPoint=[-1,-1];
        let index=-1;
        let temp=[];
        let bf="";
        if (location!="b" && location!="f"){
            location=parseInt(location);
            if (id=="r")
                location=10-location;
        }
        else {
            bf=location;
            for (let i =0; i < 9; i++){
                let count=0;
                for (let j=0; j < 10; j++){
                    if (this.checkerboard[j][i]==id+chess_piece)
                        count+=1;
                }//for2
                if (count > 1)
                    location=i+1;
            }//for1
            if(location=="b" || location=="f")
                return status;
        }
        size=parseInt(size);
        location=location-1;
        if (this.findOut(id+chess_piece,location).length ==0) 
            return status;
        if (bf =="f")
            index=this.findOut(id+chess_piece,location)[1][0];
        else
            index=this.findOut(id+chess_piece,location)[0][0];
        if (act=="gf"){
            console.log("index",index,"size",size,"act",act);
            switch (chess_piece) {
                case "v":
                    if (id=="r") {
                        if (index+size > 9)
                            return status;
                        if (size> 1){
                            if (this.findOut("",location,"vertical",[index+1,index+size-1]).length !=size-1)
                                return status;
                            else{
                                temp=this.decision(id,[index + size,location]);
                                status=temp[0];
                                targetPoint=temp[1];
                            }
                        }// size > 1
                        else {
                            temp=this.decision(id,[index+size,location]);
                            status=temp[0];
                            targetPoint=temp[1];
                        }// size <=1
                    } // id is red
                    else {
                        size=-size;
                        if (index + size < 0)
                            return status;
                        if (size < -1) {
                            if (this.findOut("",location,"vertical",[index-1,index+size+1]).length !=Math.abs(size)-1)
                                return status;
                            temp=this.decision(id,[index +size,location]);
                            status=temp[0];
                            targetPoint=temp[1];
                        }//size < -1
                        else {
                            temp=this.decision(id,[index+size,location]);
                            status=temp[0];
                            targetPoint=temp[1];
                        }
                    }//id is black
                    break;
                case "h":
                    if (id=="r"){
                        size=10 - size;
                        console.log("size",size,"location",location);
                        if (size-1==location-1 || size-1 ==location+1) {
                            if (this.findOut("",location,"vertical",[index+1,index+1]).length !=1)
                                return status;
                            temp =this.decision(id,[index+2,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1==location-2) {
                            if (this.findOut("",index,"horization",[location-1,location-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",index,"horization",[location+1,location+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else {
                            return status;
                        }
                    } //id is red
                    else {
                        if (size-1==location-1 || size-1 ==location+1) {
                            if (this.findOut("",location,"vertical",[index-1,index-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-2,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1==location-2) {
                            if (this.findOut("",index,"horization",[location-1,location-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",index,"horization",[location+1,location+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else {
                            return status;
                        }
                    }// id is black
                    break;
                case "e":
                    if (id =="r") {
                        size=10-size;
                        if (index+2 >4)
                            return status;
                        if (size-1 ==location-2) {
                            if (this.findOut("",location-1,"vertical",[index+1,index+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+2,location-2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",location+1,"vertical",[index+1,index+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+2,location+2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else
                            return status;
                    }// id is red
                    else {
                        if (index-2 < 5)
                            return status;
                        if (size-1 ==location-2) {
                            if (this.findOut("",location-1,"vertical",[index-1,index-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-2,location-2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",location+1,"vertical",[index-1,index-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-2,location+2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else
                            return status;
                    }// id is black
                    break;
                case "o":
                    if (id =="r"){
                        size=10-size;
                        if (index+1 >2)
                            return status;
                        if (!(4 < size && size < 6) || size-1 ==location)
                            return status;
                        temp=this.decision(id,[index+1,size-1]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is red
                    else{
                        if (index-1<7)
                            return status;
                        if (!(4 <= size && size <= 6) || size-1 ==location || size-1==location+2 || size-1==location-2)
                            return status;
                        temp=this.decision(id,[index-1,size-1]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is black
                    break;
                case "t":
                    if (id =="r"){
                        if (size!=1 || index+1 > 2)
                            return status;
                        temp=this.decision(id,[index+size,location]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is red
                    else{
                        if (index-1 < 7 || size!=1)
                            return status;
                        temp=this.decision(id,[index-size,location]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is black
                    break;
                case "c":
                    if (id=="r") {
                        if (index+size > 9)
                            return status;
                        if (size> 1){
                            if (this.findOut("",location,"vertical",[index+1,index+size-1]).length ==size-1){
                                temp=this.decision(id,[index + size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==2)
                                    status=0;
                            }
                            else if (this.findOut("",location,"vertical",[index+1,index+size-1]).length ==size-2) {
                                temp=this.decision(id,[index + size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==1)
                                    status=0;
                            }
                            else{
                                status=0;
                            }
                        }// size > 1
                        else {
                            temp=this.decision(id,[index+size,location]);
                            status = temp[0];
                            targetPoint=temp[1];
                            if (status==2)
                                status=0;
                        }// size <=1
                    } // id is red
                    else {
                        size=-size;
                        if (index + size < 0)
                            return status;
                        if (size < -1) {
                            if (this.findOut("",location,"vertical",[index-1,index+size+1]).length ==Math.abs(size)-1){
                                temp=this.decision(id,[index +size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==2)
                                    status=0;
                            }
                            else if (this.findOut("",location,"vertical",[index-1,index+size+1]).length ==Math.abs(size)-2){
                                temp=this.decision(id,[index +size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==1)
                                    status=0;
                            }
                            else
                                status=0;
                        }//size < -1
                        else {
                            temp=this.decision(id,[index+size,location]);
                            status = temp[0];targetPoint=temp[1];
                            if (status==2)
                                status=0;
                        }
                    }//id is black
                    break;
                case "w":
                    if (id =="r") {
                        if (size >1 || index+size > 9)
                            return status;
                        temp=this.decision(id,[index+size,location]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is red
                    else{
                        size=-size;
                        if (size<-1 || index+size < 0)
                            return status;
                        temp=this.decision(id,[index+size,location]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is black
                    break;
            } // switch
        } // act is gf
        else if (act=="gb"){
            console.log("index",index,"size",size,"act",act);
            switch (chess_piece) {
                case "v":
                    if (id=="r") {
                        if (index-size < 0)
                            return status;
                        if (size> 1){
                            if (this.findOut("",location,"vertical",[index-1,index-size+1]).length !=size-1)
                                return status;
                            temp=this.decision(id,[index - size,location]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }// size > 1
                        else {
                            temp=this.decision(id,[index - size,location]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }// size <=1
                    } // id is red
                    else {
                        size=-size;
                        if (index - size > 9)
                            return status;
                        if (size < -1) {
                            if (this.findOut("",location,"vertical",[index+1,index-size-1]).length !=Math.abs(size)-1)
                                return status;
                            temp=this.decision(id,[index - size,location]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }//size < -1
                        else {
                            temp=this.decision(id,[index - size,location]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                    }//id is black
                    break;
                case "h":
                    if (id=="r"){
                        size=10 - size;
                        if (size-1==location-1 || size-1 ==location+1) {
                            if (this.findOut("",location,"vertical",[index-1,index-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-2,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1==location-2) {
                            if (this.findOut("",index,"horization",[location-1,location-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",index,"horization",[location+1,location+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else {
                            return status;
                        }
                    } //id is red
                    else {
                        if (size-1==location-1 || size-1 ==location+1) {
                            if (this.findOut("",location,"vertical",[index+1,index+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+2,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1==location-2) {
                            if (this.findOut("",index,"horization",[location-1,location-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",index,"horization",[location+1,location+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+1,size-1]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else {
                            return status;
                        }
                    }// id is black
                    break;
                case "e":
                    if (id =="r") {
                        size=10-size;
                        if (index-2 < 0)
                            return status;
                        if (size-1 ==location-2) {
                            if (this.findOut("",location-1,"vertical",[index-1,index-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-2,location-2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",location+1,"vertical",[index-1,index-1]).length !=1)
                                return status;
                            temp=this.decision(id,[index-2,location+2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else
                            return status;
                    }// id is red
                    else {
                        if (index+2 > 9)
                            return status;
                        if (size-1 ==location-2) {
                            if (this.findOut("",location-1,"vertical",[index+1,index+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+2,location-2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else if (size-1 ==location+2){
                            if (this.findOut("",location+1,"vertical",[index+1,index+1]).length !=1)
                                return status;
                            temp=this.decision(id,[index+2,location+2]);
                            status = temp[0];
                            targetPoint=temp[1];
                        }
                        else
                            return status;
                    }// id is black
                    break;
                case "o":
                    if (id =="r"){
                        size=10-size;
                        if (index-1 < 0)
                            return status;
                        if (!(4 < size && size < 6) || size-1 ==location)
                            return status;
                        temp=this.decision(id,[index-1,size-1]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is red
                    else{
                        if (index+1 > 9)
                            return status;
                        if (!(4 <= size && size <= 6) || size-1 ==location || size-1==location+2 || size-1==location-2)
                            return status;
                        temp=this.decision(id,[index+1,size-1]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is black
                    break;
                case "t":
                    if (id =="r"){
                        if (size!=1 || index-1 < 0)
                            return status;
                        temp=this.decision(id,[index-size,location]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is red
                    else{
                        if (index+1 > 9 || size!=1)
                            return status;
                        temp=this.decision(id,[index+size,location]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }// id is black
                    break;
                case "c":
                    if (id=="r") {
                        if (index - size < 0)
                            return status;
                        if (size> 1){
                            if (this.findOut("",location,"vertical",[index-1,index-size+1]).length ==size-1){
                                temp=this.decision(id,[index - size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==2)
                                    status=0;
                            }
                            else if (this.findOut("",location,"vertical",[index-1,index-size+1]).length ==size-2) {
                                temp=this.decision(id,[index - size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==1)
                                    status=0;
                            }
                            else{
                                status=0;
                            }
                        }// size > 1
                        else {
                            temp=this.decision(id,[index-size,location]);
                            status = temp[0];
                            targetPoint=temp[1];
                            if (status==2)
                                status=0;
                        }// size <=1
                    } // id is red
                    else {
                        size=-size;
                        if (index - size > 9)
                            return status;
                        if (size < -1) {
                            if (this.findOut("",location,"vertical",[index+1,index-size-1]).length ==Math.abs(size)-1){
                                temp=this.decision(id,[index -size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==2)
                                    status=0;
                            }
                            else if (this.findOut("",location,"vertical",[index-1,index-size-1]).length ==Math.abs(size)-2){
                                temp=this.decision(id,[index -size,location]);
                                status = temp[0];
                                targetPoint=temp[1];
                                if (status==1)
                                    status=0;
                            }
                            else
                                status=0;
                        }//size < -1
                        else {
                            temp=this.decision(id,[index-size,location]);
                            status = temp[0];
                            targetPoint=temp[1];
                            if (status==2)
                                status=0;
                        }
                    }//id is black
                    break;
            } // switch
        } // act is gb
        else { // act is go horization
            if (size >9 || size <1)
                return status;
            if (id=="r")
                size=10 - size;
            size=size-1;
            console.log("index",index,"size",size,"act",act);
            switch (chess_piece) {
                case "v":
                    if ((this.findOut("",index,"horization",[location,size]).length!=Math.abs(size-location)-1 && this.checkerboard[index][size]!="") && (this.findOut("",index,"horization",[location,size]).length!=Math.abs(size-location) && this.checkerboard[index][size]==""))
                        return status;
                    temp=this.decision(id,[index,size]);
                    status = temp[0];
                    targetPoint=temp[1];
                    break;
                case "c":
                    if (this.checkerboard[index][size]=="" && this.findOut("",index,"horization",[location,size]).length==Math.abs(size-location)) {
                        temp=this.decision(id,[index,size]);
                        status = temp[0];
                        targetPoint=temp[1];
                        if (status==2)
                            status=0;
                    }
                    else if (this.checkerboard[index][size]!="" && this.findOut("",index,"horization",[location,size]).length ==Math.abs(size-location)-2) {
                        temp=this.decision(id,[index,size]);
                        status = temp[0];
                        targetPoint=temp[1];
                        if (status==1)
                            status=0;
                    }
                    else{
                        return status;
                    }
                    break;
                case "t":
                    if (!(3 <= size && size <= 5) || size ==location || Math.abs(location-size) !=1)
                        return status;
                    temp=this.decision(id,[index,size]);
                    status = temp[0];
                    targetPoint=temp[1];
                    break;
                case "w":
                    if (Math.abs(location-size)!=1)
                        return status;
                    if (id=="r"){
                        if (index <=4)
                            return status;
                        temp=this.decision(id,[index,size]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }
                    else {
                        if (index>=5)
                            return status;
                        temp=this.decision(id,[index,size]);
                        status = temp[0];
                        targetPoint=temp[1];
                    }
                    break;
            }// switch
        }//act is gh
        if (status !=0){
            if(this.checkerboard[targetPoint[0]][targetPoint[1]]=="bt"){
                this.checkerboard[targetPoint[0]][targetPoint[1]]=this.checkerboard[index][location];
                this.checkerboard[index][location]="";
                status=3;
            }
            else if(this.checkerboard[targetPoint[0]][targetPoint[1]]=="rt"){
                this.checkerboard[targetPoint[0]][targetPoint[1]]=this.checkerboard[index][location];
                this.checkerboard[index][location]="";
                status=4;
            }
            else {
                let temp=this.checkerboard[targetPoint[0]][targetPoint[1]];
                this.checkerboard[targetPoint[0]][targetPoint[1]]=this.checkerboard[index][location];
                this.checkerboard[index][location]="";
                if ((id=="r" && this.warning("b").length !=0) || (id=="b" && this.warning("r") !=0)){
                    this.checkerboard[index][location]=this.checkerboard[targetPoint[0]][targetPoint[1]];
                    this.checkerboard[targetPoint[0]][targetPoint[1]]=temp;
                    return 0;
                }
                if (this.warning(id).length !=0) {
                    status=5;
                    
                } //else
            }
            //console.log("目标点",targetPoint,this.checkerboard[targetPoint[0]][targetPoint[1]]);
            //console.log("远点",[index,location],this.checkerboard[index][location]);
        }
        return status;
    } //action
    
    findOut(target,location,direction="vertical",region=[0,9]) {
        let pointList=[];
        if (region[0] > region[1]) {
            let temp=region[1];
            region[1]=region[0];
            region[0]=temp;
        }
        if (direction=="vertical"){
            for (let i =region[0]; i <= region[1]; i++){
                if (this.checkerboard[i][location] ==target) 
                    pointList.push([i,location]);
            } // for 
        } // if
        else {
            for (let i =region[0]; i <= region[1]; i++){
                if (this.checkerboard[location][i] ==target) 
                    pointList.push([location,i]);
            } // for 
        } //else
        return pointList;
    }//findOut
    
    decision(id,point){
        console.log("目标位置检测",point);
        if (this.checkerboard[point[0]][point[1]] =="")
            return [1,point];
        else{
            if (this.checkerboard[point[0]][point[1]][0]==id)
                return [0,[-1,-1]];
            else
                return [2,point];
        }//else
    }//decision

    warning(id){
        let targetId="b";
        if (id=="b")
            targetId="r";
        let positionList=[];
        let kingPosition=[];
        let threatList =[];
        console.log("targetId",targetId);
        for (let i =0; i <10; i++){
            for (let j=0; j < 9; j++){
                if (this.checkerboard[i][j]!="" && this.checkerboard[i][j][0]!=targetId)
                    positionList.push([this.checkerboard[i][j],[i,j]]);
                if (this.checkerboard[i][j][0]==targetId && this.checkerboard[i][j][1]=="t")
                    kingPosition.push(i,j);
            }// for 2
        }//for1
        console.log("我方部署",positionList,positionList.length);
        console.log("kingPosition",kingPosition);
        for (let i =0; i < positionList.length; i++){
            let k=positionList[i][1][0];
            let j=positionList[i][1][1];
            switch (positionList[i][0][1]) {
                case "v":
                    if (positionList[i][1][0] ==kingPosition[0] || positionList[i][1][1] ==kingPosition[1]){
                        if (this.findOut("",kingPosition[0],"horization",[positionList[i][1][1],kingPosition[1]]).length==Math.abs(positionList[i][1][1]-kingPosition[1])-1 || this.findOut("",kingPosition[1],"vertical",[positionList[i][1][0] , kingPosition[0]]).length ==Math.abs(positionList[i][1][0]-kingPosition[0])-1)
                            threatList.push(positionList[i]);
                    }//if
                    break;
                case "c":
                    if (positionList[i][1][0] ==kingPosition[0] || positionList[i][1][1] ==kingPosition[1]){
                        if (this.findOut("",kingPosition[0],"horization",[positionList[i][1][1],kingPosition[1]]).length==Math.abs(positionList[i][1][1]-kingPosition[1])-2 || this.findOut("",kingPosition[1],"vertical",[positionList[i][1][0] , kingPosition[0]]).length ==Math.abs(positionList[i][1][0]-kingPosition[0])-2)
                            threatList.push(positionList[i]);
                    }
                    break;
                case "w":
                    if (positionList[i][1][0] ==kingPosition[0] || positionList[i][1][1] ==kingPosition[1]){
                        if (Math.abs(positionList[i][1][0] -kingPosition[0])==1 || Math.abs(positionList[i][1][1]-kingPosition[1])==1)
                            threatList.push(positionList[i]);
                    }
                    break;
                case "h":
                    console.log("contemporary", k,j);
                    if (Math.abs(positionList[i][1][0] -kingPosition[0]) ==2 && Math.abs(positionList[i][1][1] -kingPosition[1]) ==1) {
                        if ((kingPosition[0] > positionList[i][1][0] && this.checkerboard[k+1][j]=="") || (kingPosition[0] < positionList[i][1][0] && this.checkerboard[k-1][j]==""))
                            threatList.push(positionList[i]);
                    }
                    if (Math.abs(positionList[i][1][1] -kingPosition[1]) ==2 && Math.abs(positionList[i][1][0] -kingPosition[0]) ==1) {
                        if ((kingPosition[1] > positionList[i][1][1] && this.checkerboard[k][j+1]=="") || (kingPosition[1] < positionList[i][1][1] && this.checkerboard[k][j-1]==""))
                            threatList.push(positionList[i]);
                    }
            }//switch
        }//for
        console.log("将军其",threatList);
        return threatList;
    }//warning
    
    searchRole(id,role){
        let result=[];
        for (let i =0;i < 10; i++){
            for (let j =0; j < 9; j++){
                if(this.checkerboard[i][j]==id+role){
                    if (id=="r")
                        result.push([i+1,9-j]);
                    else
                        result.push([10-i,j+1]);
                }
            }//for2
        }//for1
        return result;
    } //role
    
    killup(myId){
        let targetId="b";
        if (myId=="b")
            targetId="r";
        let threatList = this.warning(myId);
        let kingPosition = this.searchRole(targetId, "t");
        console.log("kingPosition",kingPosition);
        console.log("threatList",threatList);
        //被将军的老将自己向四个方向尝试移动，试探可能的逃脱位置
        if (![0,5].includes(this.action(targetId,"t",kingPosition[0][1], "gf","1"))){
            this.stepback();
            console.log("king",this.searchRole(targetId,"t"));
            return 0;
        }
        this.stepback();
        if (![0,5].includes(this.action(targetId,"t",kingPosition[0][1], "gb","1"))){
            this.stepback();
            return 0;
        }
        this.stepback();
        if (kingPosition[0][1]==5){
            if (![0,5].includes(this.action(targetId,"t",kingPosition[0][1], "gh","4"))){
                this.stepback();
                return 0;
            }
            this.stepback();
            if (![0,5].includes(this.action(targetId,"t",kingPosition[0][1], "gh","6"))){
                this.stepback();
                return 0;
            }
            this.stepback();
        }
        else {
            if (![0,5].includes(this.action(targetId,"t",kingPosition[0][1], "gh","5"))){
                this.stepback();
                return 0;
            }
            this.stepback();
        }
        //console.log("threatList",threatList);
        kingPosition=kingPosition[0];
        if (targetId=="b"){
            kingPosition[0] = 10 - kingPosition[0];
            kingPosition[1] = 9 - kingPosition[1];
        }
        else {
            kingPosition[0]-=1;
            kingPosition[1]-=1;
        }
        for (let i =0; i < threatList.length; i++){
            let x=threatList[i][1][0];
            let y=threatList[i][1][1];
            if (this.eatIt([x,y], targetId) ==1)
                return 0;
            console.log("here5");
            switch (this.checkerboard[x][y][1]) {
                case "v":
                console.log("x,y",x,y,"kingPosition",kingPosition);
                
                if ( x ==kingPosition[0]){
                    if (y < kingPosition[1]){
                        for (let j =y+1; j < kingPosition[1]; j++){
                            if (this.eatIt([x,j], targetId) ==1)
                                return 0;
                        }
                    }
                    else{
                        for (let j = kingPosition[1]+1; j < y; j++){
                            if (this.eatIt([x,j], targetId) ==1)
                                return 0;
                        }
                    }
                } //if
                else {
                    if (x < kingPosition[0]){
                        for (let j =x+1; j < kingPosition[0]; j++){
                            if (this.eatIt([j,y], targetId) ==1)
                                return 0;
                        }
                    }
                    else{
                        for (let j = kingPosition[0]+1; j < x; j++){
                            if (this.eatIt([j,y], targetId) ==1)
                                return 0;
                        }
                    }
                } //else
                break;
                case "h":
                if (Math.abs(x - kingPosition[0]) ==2){
                    if (this.eatIt([(x + kingPosition[0])/2, (x + kingPosition[0])/2],targetId) ==1)
                        return 0;
                }
                if (Math.abs(y - kingPosition[1]) ==2){
                    if (this.eatIt([(y + kingPosition[1])/2, (y + kingPosition[1])/2], targetId) ==1)
                        return 0;
                }
                break;
                case "c":
                if ( x ==kingPosition[0]){
                    if (y < kingPosition[1]){
                        for (let j =y+1; j < kingPosition[1]; j++){
                            if (this.checkerboard[x][j] !=""){
                                if (this.checkerboard[x][j][0] ==targetId)
                                    return 0;
                                else {
                                    if (this.eatIt([x,j], targetId) ==1)
                                        return 0;
                                }
                            }
                            else{
                                if (this.eatIt([x,j], targetId) ==1)
                                    return 0;
                            }
                        }
                    }
                    else{
                        for (let j = kingPosition[1]+1; j < y; j++){
                            if (this.checkerboard[x][j]!=""){
                                if (this.checkerboard[x][j][0] ==targetId)
                                    return 0;
                                else {
                                    if (this.eatIt([x,j] , targetId) ==1)
                                        return 0;
                                }
                            }
                            else {
                                if (this.eatIt([x,j], targetId) ==1)
                                    return 0;
                            }
                        }
                    }
                } //if
                else {
                    if (x < kingPosition[0]){
                        for (let j =x+1; j < kingPosition[0]; j++){
                            if (this.checkerboard[j][y]!=""){
                                if (this.checkerboard[j][y][0] ==targetId)
                                    return 0;
                                else {
                                    if (this.eatIt([j,y] , targetId) ==1)
                                        return 0;
                                }
                            }
                            else {
                                if (this.eatIt([j,y], targetId) ==1)
                                    return 0;
                            }
                        }
                    }
                    else{
                        for (let j = kingPosition[0]+1; j < x; j++){
                            if (this.checkerboard[j][y]!=""){
                                if (this.checkerboard[j][y][0] ==targetId)
                                    return 0;
                                else {
                                    if (this.eatIt([j,y] , targetId) ==1)
                                        return 0;
                                }
                            }
                            else {
                                if (this.eatIt([j,y], targetId) ==1)
                                    return 0;
                            }
                        }
                    }
                } //else
                break;
                default:
                console.log(8);
            } //switch
        } //for
        return 1;
    } //killup
    
    eatIt(position, id){
        let characterList = [];
        for (let i =0;i < 10; i++){
            for (let j =0; j < 9; j++){
                if(this.checkerboard[i][j][0]==id)
                    characterList.push([i, j]);
            }
        }
        console.log(characterList);
        for (let i =0; i < characterList.length; i++){
            let x=characterList[i][0];
            let y = characterList[i][1];
            switch (this.checkerboard[x][y][1]) {
                case "v":
                if (x ==position[0]) {
                    console.log("length",this.findOut("",x, "horization", [y,position[1]]).length);
                    if (this.findOut("",x, "horization", [y,position[1]]).length ==Math.abs(y - position[1] -1)) 
                        return 1;
                    
                } //if
                if (y ==position[1]) {
                    if (this.findOut("", y, "vertical", [x, position[0]]).length == Math.abs(x - position[0] -1))
                        return 1;
                }//if 
                break;
                case "h":
                if (Math.abs(x - position[0]) ==2 && Math.abs(y - position[1]) ==1){
                    if (this.findOut("", y, "vertical", [(x+position[0])/2,(x+position[0])/2]).length==1)
                        return 1;
                }
                if (Math.abs(y - position[1]) ==2 && Math.abs(x - position[0]) ==1){
                    if (this.findOut("", x, "horization", [(y+position[1])/2, (y+position[1])/2]).length ==1) 
                        return 1;
                }
                break;
                case "c":
                if (x==position[0]) {
                    if (this.findOut("",x, "horization", [y,position[1]]).length ==Math.abs(y - position[1] -2)) 
                        return 1;
                }
                if (y == position[1]) {
                    if (this.findOut("", y, "vertical", [x, position[0]]).length == Math.abs(x - position[0] -2))
                        return 1;
                }
                break;
                case "o":
                if (id =="b"){
                if ([7,8,9].includes(position[0]) && [3,4,5].includes(position[1]))
                    if (Math.abs(x - position[0])==1 && Math.abs(y - position[1])==1)
                        return 1;
                }
                else {
                    if ([0,1,2].includes(position[0]) && [3,4,5].includes(position[1]))
                        if (Math.abs(x - position[0]) ==1 && Math.absj(y - position[1]) ==1)
                            return 1;
                }
                break;
                case "e":
                if (id=="r"){
                    if (position[0] < 5)
                        if (Math.abs(x - position[0])==2 && Math.abs(y - position[1])==2)
                            return 1;
                }
                else {
                    if (position[0] > 4) 
                        if (Math.abs(x - position[0]) ==2 && Math.abs(y - position[1]) ==2) 
                            return 1;
                }
                break;
                default:
                console.log(9);
            } //switch
            
        }//for
        return 0;
    } //eatIt
}

module.exports =GameLogic;