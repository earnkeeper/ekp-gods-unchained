import {
    ClientConnectedEvent,
    ClientDisconnectedEvent,
    ClientStateChangedEvent,
    collection,
    RpcEvent,
    UiElement,
  } from '@earnkeeper/ekp-sdk';
  import {
    AbstractController,
    ApmService,
    ClientService,
    logger,
  } from '@earnkeeper/ekp-sdk-nestjs';
  import { Injectable } from '@nestjs/common';
import { format } from 'path';
import { CardDto } from 'src/shared/api';
import { CardForm } from 'src/util/form';
import { CardService } from './card.service';
import { CardDocument } from './ui/cards.document';
import card from './ui/card.uielement';
import { DEFAULT_CARD_FORM } from 'src/util';

  const COLLECTION_NAME = collection(CardDocument);
  const PATH = 'cards';
  
  @Injectable()
  export class CardController extends AbstractController {
    constructor(
      clientService: ClientService,
      private cardService: CardService,
      private apmService: ApmService,
    ) {
      super(clientService);
    }
  
    async onClientConnected(event: ClientConnectedEvent) {
      await this.clientService.emitMenu(event, {
        id: PATH,
        title: 'Cards',
        navLink: PATH,
        icon: 'cil-color-palette',
      });
  
      await this.clientService.emitPage(event, {
        id: PATH,
        element: card(),
      });
    }
  
    async onClientRpc(event: RpcEvent) {
      // Do nothing
    }
  
    async onClientStateChanged(event: ClientStateChangedEvent) {
      if (PATH !== event?.state?.client?.path) {
        return;
      }
   
      await this.clientService.emitBusy(event, COLLECTION_NAME);
  
      try {
        const form: CardForm =
        event.state.forms?.cards ?? DEFAULT_CARD_FORM;

          event.state.forms?.playerName ?? COLLECTION_NAME;
          const cardDocuments =
          await this.cardService.getCardDocuments(
            form,
          );
  
        this.clientService.emitDocuments(
          event,
          COLLECTION_NAME,
          cardDocuments,
        );
      } catch (error) {
        this.apmService.captureError(error);
        logger.error('Error occurred while handling event', error);
        console.error(error);
      } finally {
        await this.clientService.emitDone(event, COLLECTION_NAME);
      }
    }
  
    async onClientDisconnected(event: ClientDisconnectedEvent) {
      // Do nothing
    }
  }


  