import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../firebase-config';

// Get all jobs
export const getAllJobs = async () => {
  try {
    const jobsSnapshot = await getDocs(collection(db, 'jobs'));
    const jobs = [];
    jobsSnapshot.forEach((doc) => {
      const data = doc.data();
      // Remove _id if it exists (old MongoDB field) and use Firebase doc.id instead
      delete data._id;
      
      // Ensure all required fields exist with default values to prevent filter errors
      const jobData = {
        jobTitle: data.jobTitle || '',
        companyName: data.companyName || '',
        jobLocation: data.jobLocation || '',
        salaryType: data.salaryType || '',
        employmentType: data.employmentType || '',
        experienceLevel: data.experienceLevel || '',
        postingDate: data.postingDate || '',
        minPrice: data.minPrice || '',
        maxPrice: data.maxPrice || '',
        description: data.description || '',
        companyLogo: data.companyLogo || '',
        skills: data.skills || [],
        postedBy: data.postedBy || '',
        ...data, // Spread remaining fields
        id: doc.id  // Put id last to ensure it doesn't get overridden
      };
      jobs.push(jobData);
    });
    return jobs;
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
};

// Get a job by ID
export const getJobById = async (jobId) => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobs', jobId));
    if (jobDoc.exists()) {
      const data = jobDoc.data();
      delete data._id;
      return {
        ...data,
        id: jobDoc.id
      };
    } else {
      throw new Error('Job not found');
    }
  } catch (error) {
    console.error('Error getting job:', error);
    throw error;
  }
};

// Post a new job
export const postJob = async (jobData) => {
  try {
    // Remove _id if it exists (shouldn't be in new jobs)
    const cleanData = {...jobData};
    delete cleanData._id;
    delete cleanData.id; // Remove id too, Firebase will generate it
    
    const jobWithTimestamp = {
      ...cleanData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'jobs'), jobWithTimestamp);
    return {
      id: docRef.id,
      message: 'Job posted successfully'
    };
  } catch (error) {
    console.error('Error posting job:', error);
    throw error;
  }
};

// Get jobs by email (posted by user)
export const getJobsByEmail = async (email) => {
  try {
    const q = query(collection(db, 'jobs'), where('postedBy', '==', email));
    const jobsSnapshot = await getDocs(q);
    const jobs = [];
    jobsSnapshot.forEach((doc) => {
      const data = doc.data();
      delete data._id;
      jobs.push({
        ...data,
        id: doc.id
      });
    });
    return jobs;
  } catch (error) {
    console.error('Error getting user jobs:', error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (jobId) => {
  try {
    if (!jobId) {
      throw new Error('Job ID is required');
    }
    await deleteDoc(doc(db, 'jobs', String(jobId)));
    return { message: 'Job deleted successfully' };
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

// Update a job
export const updateJob = async (jobId, updateData) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    const dataWithTimestamp = {
      ...updateData,
      updatedAt: new Date()
    };
    
    await updateDoc(jobRef, dataWithTimestamp);
    return { message: 'Job updated successfully' };
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};
