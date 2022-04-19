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
import { CardDocument } from '../card/ui/card.document';
  import { PlannerService } from './planner.service';
  import planner from './ui/planner.uielement';
  
  const COLLECTION_NAME = collection(CardDocument);
  const PATH = 'planner';
  
  @Injectable()
  export class PlannerController extends AbstractController {
    constructor(
      clientService: ClientService,
      private cardService: PlannerService,
      private apmService: ApmService,
    ) {
      super(clientService);
    }
  
    async onClientConnected(event: ClientConnectedEvent) {
      await this.clientService.emitMenu(event, {
        id: PATH,
        title: 'Battle Planner',
        navLink: PATH,
        icon: 'cil-search',
      });
  
      await this.clientService.emitPage(event, {
        id: PATH,
        element: planner(),
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
        const documents = await this.cardService.getPlannerDocuments();
  
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
  