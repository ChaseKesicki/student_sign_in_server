module.exports = (sequelize, DataTypes) => {
    // will define the model
    const Student = sequelize.define('Student', {
        // will define the columns in the database - give them a name, and a type
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
            // todo future = check for aa1234aa format
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })
    // create or updates table in database
    Student.sync( {force: false}).then( () => {
        console.log('Synced student table')}
    )

    return Student
}