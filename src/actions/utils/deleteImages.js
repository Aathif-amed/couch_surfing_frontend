import deleteFile from "../../firebase/deletefile";

const deleteImages = async (images, userId) => {
  if (images.length > 0) {
    //storing file image urls in array named promises and fullfill these promises by promise all method as in line 11 inside try block
    //sample url
    //https://firebasestorage.googleapis.com/v0/b/couch-surfing-376605.appspot.com/o/rooms%2F63dd197393a976e3d409f832%2F2f2f51e0-21a5-47cb-af0e-1862e6f4db55.png?alt=media&token=ac595aa5-506c-4470-9f82-9e29e29244d0
    const promises = images.map((imgURL) => {
      //in the above url line 7 we start split in [(line7,Col92) as per vscode line/cloum values ] and end in 2F
      //and we need second part so as per index its 1 and we again split it by ? mark in url  and take the first part which is the required image name
      const imgName = imgURL?.split(`${userId}%2F`)[1]?.split("?")[0];
      return deleteFile(`rooms/${userId}/${imgName}`);
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }
};

export default deleteImages;
