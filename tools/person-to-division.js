import Mongoose from "server/db/Mongoose";
async function main(){
    const persons = await  Mongoose.person.find().populate('division')
    for(const p of persons){
        if(!p.division) continue;
        p.division.persons.push(p)
        await p.division.save();
    }
    Mongoose.close()
}

main()
