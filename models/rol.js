//tienen el mismo nombre que la collecion pero sin ls 's

const {Schema,model} = require('mongoose');


const RoleSchema = Schema({
    rol:{
        type:String,
        require:[true,'El rol es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);
