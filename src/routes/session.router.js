import { Router } from "express";
import { uManager } from "../dao/managersMongo/usersManager.js";

import { hashData, compareData } from "../utils.js";
import passport from "passport";

const router = Router();




// SIGNUP - LOGIN - PASSPORT LOCAL

router.post(
    "/signup",
    passport.authenticate("signup", {
      successRedirect: "/home",
      failureRedirect: "/error",
    })
  );
  
  router.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/home",
      failureRedirect: "/error",
    })
  );
  


  // SIGNUP - LOGIN - PASSPORT GITHUB
  
  router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  

  router.get("/callback", passport.authenticate("github"), (req, res) => {
    res.redirect('/home');
  });
  

  router.get("/signout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });
  

  router.post("/restaurar", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await uManager.findUserByEmail(email);      
      if (!user) {        
        return res.redirect("/restaurar");
      }
      const hashedPassword = await hashData(password);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: "Password updated" });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  export default router;









