import {
  Button,
  Col,
  collection,
  Container,
  Datatable,
  documents,
  Form,
  formatAge,
  formatToken,
  GridTile,
  Image,
  Input,
  isBusy,
  PageHeaderTile,
  Row,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { DEFAULT_CARD_FORM} from '../../../util';
import { CardDocument } from './cards.document';

export default function element(): UiElement {
  return Container({
    children: [
      Row({
        className: 'mb-2',
        children: [
          Col({
            className: 'col-auto',
            children: [
              PageHeaderTile({
                title: 'Cards',
                icon: 'cil-history',
              }),
            ],
          }),
        ],
      }),
      Span({
        className: 'd-block mt-1 mb-2 font-small-3',
        content:
          'Enter a player name to view, search and filter their battle history',
      }),
      formRow(),
      historyRow(),
    ],
  });
}

function formRow(): UiElement {
  return Form({
    name: 'Card',
    schema: {
      type: 'object',
      properties: {
        playerName: 'string',
      },
      default: DEFAULT_CARD_FORM,
    },
    children: [
      Row({
        className: 'mb-1',
        children: [
          Col({
            className: 'col-12 col-md-auto',
            children: [
              Input({
                label: 'Player Name',
                name: 'playerName',
              }),
            ],
          }),
          Col({
            className: 'col-12 col-md-auto my-auto',
            children: [
              Button({
                label: 'View',
                isSubmit: true,
                busyWhen: isBusy(collection(CardDocument)),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function historyRow(): UiElement {
  return Datatable({
    defaultSortFieldId: 'timestamp',
    defaultSortAsc: false,
    defaultView: {
      xs: 'grid',
      lg: 'column',
    },
    data: documents(CardDocument),
    busyWhen: isBusy(collection(CardDocument)),
    filters: [
      {
        columnId: 'rulesets',
        type: 'checkbox',
        //imageMap: RULESET_IMAGE_MAP,
      },
      {
        columnId: 'result',
        type: 'checkbox',
      },
    ],
    gridView: {
      tileWidth: [12, 6, 4, 4],
      tile: GridTile({
        image: Row({
          className: 'my-4',
          children: [
            Col({
              children: [
              ],
            }),
            Col({
              className: 'my-auto col-auto p-0',
              children: [
                Span({
                  content: 'vs',
                }),
              ],
            }),
            Col({
              children: [
            
              ],
            }),
          ],
        }),
        details: [
          {
            label: 'User',
            value: '$.user',
          },
          {
            label: 'Proto',
            value: '$.proto'
          },
          {
            label: 'Purity',
            value: '$.purity'
          },
         
        ],
        left: {
          content: formatAge('$.timestamp'),
        },
        right: {
          content: formatToken('$.qty'),
        },
      }),
    },
    columns: [
      {
        id: 'user',
        sortable: true,
      },
      {
        id: 'purity',
        title: 'Purity',
        width: '80px',
      },
      {
        id: 'proto',
        title: 'Proto',
      },
    ],
  });
}
