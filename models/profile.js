const profile = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      profilePhoto: {
        type: DataTypes.STRING,
      },
      isMarried: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "profiles",
      timestamps: false,
    }
  );
  Profile.associate = (models) => {
    Profile.belongsTo(models.Auth, {
      onUpdate: "CASCADE",
    });
  };

  return Profile;
};

module.exports = profile;
