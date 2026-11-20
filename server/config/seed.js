const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Service = require('../models/Service');
const Experience = require('../models/Experience');
const Settings = require('../models/Settings');
const store = require('../storage/dataStore');

const seedDatabaseIfEmpty = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.com').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';

    let existingUser = await User.findOne({ email: adminEmail });
    if (!existingUser) {
      console.log(`[Seed] Creating initial admin user for ${adminEmail}...`);
      existingUser = await User.create({
        name: 'Admin Developer',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('[Seed] Admin user created in MongoDB Atlas successfully.');
    } else {
      console.log(`[Seed] Admin user exists in MongoDB Atlas (${existingUser.email}).`);
      const passwordMatches = await existingUser.matchPassword(adminPassword);
      if (!passwordMatches) {
        console.log('[Seed] Syncing admin password with current environment configuration in MongoDB Atlas...');
        existingUser.password = adminPassword;
        await existingUser.save();
        console.log('[Seed] Admin password updated successfully in MongoDB Atlas.');
      }
    }

    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      const storedProfile = store.getProfile();
      console.log('[Seed] Seeding profile data into MongoDB Atlas...');
      const cleanProfile = { ...storedProfile };
      delete cleanProfile._id;
      await Profile.create(cleanProfile);
      console.log('[Seed] Profile seeded successfully.');
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const storedProjects = store.getProjects();
      if (storedProjects && storedProjects.length > 0) {
        console.log(`[Seed] Seeding ${storedProjects.length} projects into MongoDB Atlas...`);
        const cleanProjects = storedProjects.map(p => {
          const item = { ...p };
          delete item._id;
          return item;
        });
        await Project.insertMany(cleanProjects);
        console.log('[Seed] Projects seeded successfully.');
      }
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const storedSkills = store.getSkills();
      if (storedSkills && storedSkills.length > 0) {
        console.log(`[Seed] Seeding ${storedSkills.length} skills into MongoDB Atlas...`);
        const cleanSkills = storedSkills.map(s => {
          const item = { ...s };
          delete item._id;
          return item;
        });
        await Skill.insertMany(cleanSkills);
        console.log('[Seed] Skills seeded successfully.');
      }
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const storedServices = store.getServices();
      if (storedServices && storedServices.length > 0) {
        console.log(`[Seed] Seeding ${storedServices.length} services into MongoDB Atlas...`);
        const cleanServices = storedServices.map(s => {
          const item = { ...s };
          delete item._id;
          return item;
        });
        await Service.insertMany(cleanServices);
        console.log('[Seed] Services seeded successfully.');
      }
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      const storedExp = store.getExperiences();
      if (storedExp && storedExp.length > 0) {
        console.log(`[Seed] Seeding ${storedExp.length} experience/education records into MongoDB Atlas...`);
        const cleanExp = storedExp.map(e => {
          const item = { ...e };
          delete item._id;
          return item;
        });
        await Experience.insertMany(cleanExp);
        console.log('[Seed] Experiences seeded successfully.');
      }
    }

    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      const storedSettings = store.getSettings();
      console.log('[Seed] Seeding site settings into MongoDB Atlas...');
      const cleanSettings = { ...storedSettings };
      delete cleanSettings._id;
      await Settings.create(cleanSettings);
      console.log('[Seed] Settings seeded successfully.');
    }

    console.log('[Seed] MongoDB Atlas database verification & synchronization complete.');
    return true;
  } catch (err) {
    console.error('[Seed Error] Failed to seed database:', err.message);
    return false;
  }
};

module.exports = { seedDatabaseIfEmpty };
