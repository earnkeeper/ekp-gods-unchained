import {
  ClientConnectedEvent,
  ClientDisconnectedEvent,
  ClientStateChangedEvent,
  collection,
  RpcEvent,
} from '@earnkeeper/ekp-sdk';
import {
  AbstractController,
  ApmService,
  ClientService,
  logger,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import { DEFAULT_COLLECTION_FORM } from 'src/util';
import { CardForm } from '../../util/form';
import { CardService } from './card.service';
import { CardDocument } from './ui/card.document';
import card from './ui/card.uielement';

const COLLECTION_NAME = collection(CardDocument);
const PATH = 'cards';

@Injectable()
export class CardController extends AbstractController {
  constructor(
    clientService: ClientService,
    private collectionService: CardService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Card Browser',
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
        event.state.forms?.collection ?? DEFAULT_COLLECTION_FORM;

      const playerAddress = form.playerAddress;

      const documents = await this.collectionService.getCollectionDocuments(
        playerAddress,
      );

      this.clientService.emitDocuments(event, COLLECTION_NAME, documents);
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
