import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import {IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonLabel} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { copyOutline, shareSocialOutline } from 'ionicons/icons'; 

import { Clipboard } from '@capacitor/clipboard';
import { Share } from '@capacitor/share';
import { Dialog } from '@capacitor/dialog';
import { ScreenReader } from '@capacitor/screen-reader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonLabel],
})
export class HomePage {

  Message: string = '¡Buen Dia! Ojala no mueras hoy :D';

  constructor() {
    addIcons({ copyOutline, shareSocialOutline });
  }

  async copyMessage() {
    try {
      await Clipboard.write({
        string: this.Message
      });
      await Dialog.alert({
        title: 'Triunfo',
        message: 'El mensaje ha sido exitosamente copiado',
        buttonTitle: 'OK',
      });
    } catch (error) {
      await Dialog.alert({
        title: 'Error',
        message: 'Algo ha fallado.',
        buttonTitle: 'OK',
      });
    }
  }

  async shareMessage() {
    try {
      const canShare = await Share.canShare();
      if (!canShare.value) {
         await Dialog.alert({
            title: 'Fracaso',
            message: 'No fue posible compartir el mensaje.',
            buttonTitle: 'OK',
         });
         return;
      }

      await Share.share({
        title: 'Un saludo',
        text: this.Message,
        dialogTitle: 'Enviar saludo por medio de:', 
      });

      await Dialog.alert({
        title: '',
        message: 'El mensaje esta listo para ser enviado',
        buttonTitle: 'OK',
      });

    } catch (error: any) {
       console.error('Error: ', error);
       if (error && error.message) {
         await Dialog.alert({
           title: 'Error',
           message: `No fue posible enviar el mensaje.`,
           buttonTitle: 'OK',
         });
       }
    }
  }

  async readMessage() {
    try {
      await ScreenReader.speak({ 
        value: '¡Buen Dia! Ojala no mueras hoy :D' 
      });
      await Dialog.alert({
        title: 'Hola',
        message: 'Se supone que el audio se esta reproduciendo',
        buttonTitle: 'OK',
      });
    } catch (error) {
      await Dialog.alert({
        title: 'Error',
        message: 'No se pudo leer el mensaje :(',
        buttonTitle: 'OK',
      });
    }
  }
}