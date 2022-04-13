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
import { CollectionService } from './collections.service';
import { CollectionDocument } from './ui/collections.document';
import collections from './ui/collections.uielement';
import { DEFAULT_CARD_FORM } from 'src/util';

const COLLECTION_NAME = collection(CollectionDocument);
const PATH = 'collection';

@Injectable()
export class CollectionController extends AbstractController {
  constructor(
    clientService: ClientService,
    private collectionService: CollectionService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Collection',
      navLink: PATH,
      icon: 'cil-color-palette',
    });

    await this.clientService.emitPage(event, {
      id: PATH,
      element: collections(),
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
        const collectionDocuments =
        await this.collectionService.getCollectionDocuments(form
        );

      this.clientService.emitDocuments(
        event,
        COLLECTION_NAME,
        collectionDocuments,
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


