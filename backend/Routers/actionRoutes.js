import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Action from '../models/actionModel.js';
import { isAuth, isAdmin } from '../untils.js'
import { toast } from 'react-toastify';

const  actionRouter = express.Router();

actionRouter.get('/', async (req, res) => {
  const actions = await Action.find();
  res.send(actions);
});



actionRouter.get('/:id', async (req, res) => {
  const action = await Action.findById(req.params.id);
  if (action) {
    res.send(action);
  } else {
    res.status(404).send({ message: 'Action Not Found' });
  }
});

actionRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const newAction = new  Action({
        action:  req.body.action,
        slug:  req.body.slug,
        detail:  req.body.detail,
        practice:  req.body.practice,
        img:  req.body.img,
        vdo: req.body.vdo

      });
      const action = await newAction.save();
      res.send({ message: 'Action Created', action });
    })
  );


  actionRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const actionId = req.params.id;
      const acction = await Action.findById(actionId);
      if (acction) {
        acction.action = req.body.action,
        acction.slug =  req.body.slug,
        acction.detail =  req.body.detail,
        acction.practice = req.body.practice,
        acction.img = req.body.img,
        acction.vdo = req.body.vdo,

        await acction.save();
        res.send({ message: 'Action Updated' });
      } else {
        res.status(404).send({ message: 'Action Not Found' });
      }
    })
  );

  actionRouter.put(
    '/learn/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const actionId = req.params.id;
      const acction = await Action.findById(actionId);
      if (acction) {
        acction.action = req.body.action,
        acction.slug =  req.body.slug,
        acction.detail =  req.body.detail,
        acction.practice = req.body.practice,
        acction.img = req.body.img,
        acction.vdo = req.body.vdo,

        await acction.save();
        res.send({ message: 'Action Updated' });
      } else {
        res.status(404).send({ message: 'Action Not Found' });
      }
    })
  );



 actionRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const action = await Action.findById(req.params.id);
      if (action) {
        await action.remove();
        res.send({ message: 'Action Deleted' });
      } else {
        res.status(404).send({ message: 'Action Not Found' });
      }
    })
  );
  
  

  export default actionRouter;