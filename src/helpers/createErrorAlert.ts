import {AlertController} from '@ionic/angular';
import {UserService} from '../services/user/user.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

export async function createErrorAlert(error: string,
                                       alertController: AlertController,
                                       userService: UserService,
                                       storage: Storage,
                                       router: Router) {
  return await alertController.create({
    header: 'Error',
    message: error,
    buttons: [
      {
        text: 'OK',
        handler: async () => {
          await storage.remove('user');
          userService.updateUser(null);
          await router.navigate(['/log-in']);
          await alertController.dismiss();
        }
      },
    ],
    translucent: true,
  });
}
