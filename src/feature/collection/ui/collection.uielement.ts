import {
  Button,
  Col,
  Container,
  Datatable,
  Form,
  formatCurrency,
  formatToken,
  Fragment,
  GridTile,
  Image,
  Input,
  isBusy,
  PageHeaderTile,
  Row,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { DEFAULT_COLLECTION_FORM } from '../../../util';
import { collection, documents } from '../../../util/paths';
import { CollectionDocument } from './collection.document';

export default function element(): UiElement {
  return Container({
    children: [titleRow(), statsRow(), yourDetailsRow(), decksTable()],
  });
}

function titleRow() {
  return Fragment({
    children: [
      Row({
        className: 'mb-2',
        children: [
          Col({
            className: 'col-auto',
            children: [
              PageHeaderTile({
                title: 'Card Collection',
                icon: 'cil-cart',
              }),
            ],
          }),
        ],
      }),
      Span({
        className: 'd-block mt-1 mb-2 font-small-4',
        content: ' Card Collection ',
      }),
    ],
  });
}

function statsRow() {
  return Row({
    children: [
      Col({
        className: 'col-auto',
        children: [],
      }),
      Col({
        className: 'col-auto',
        children: [],
      }),
    ],
  });
}

function yourDetailsRow() {
  return Fragment({
    children: [
      Span({
        className: 'font-weight-bold font-medium-3 d-block',
        content: 'Your Details',
      }),
      Span({
        className: 'd-block mt-1 mb-2 font-small-3',
        content:
          'Enter your player name below to update the cost of decks based on the cards you already own',
      }),
      Form({
        name: 'collection',
        schema: {
          type: 'object',
          properties: {
            playerAddress: 'string',
          },
          default: DEFAULT_COLLECTION_FORM,
        },
        children: [
          Row({
            className: 'mb-1',
            children: [
              Col({
                className: 'col-12 col-md-auto',
                children: [
                  Input({
                    label: 'Player Address',
                    name: 'playerAddress',
                  }),
                ],
              }),

              Col({
                className: 'col-12 col-md-auto my-auto',
                children: [
                  Button({
                    label: 'Update',
                    isSubmit: true,
                    busyWhen: isBusy(collection(CollectionDocument)),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function decksTable() {
  return Fragment({
    children: [
      Datatable({
        defaultSortFieldId: 'teamName',
        defaultSortAsc: true,
        data: documents(CollectionDocument),
        //onRowClicked: showModal(TEAM_MODAL_ID, '$'),
        pointerOnHover: true,
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(CollectionDocument)),
        defaultView: {
          xs: 'grid',
          lg: 'column',
        },

        gridView: {
          tileWidth: [12, 6, 4, 3],
          tile: GridTile({
            image: Image({
              className: 'card-img-top',
              src: '$.cardImg',
            }),
            details: [
              {
                label: 'Name',
                value: '$.name',
              },
              {
                label: 'God',
                value: '$.god',
              },
              {
                label: 'Rarity',
                value: '$.rarity',
              },
              {
                label: 'Mana',
                value: '$.mana',
              },
              {
                label: 'Type',
                value: '$.type',
              },
              {
                label: 'Set',
                value: '$.set',
              },
              {
                label: 'Live',
                value: '$.live',
              },
            ],
            left: {
              content: formatCurrency('$.price', '$.fiatSymbol'),
            },
            right: {
              content: formatToken('$.qty'),
            },
          }),
        },
        columns: [
          {
            id: 'name',
            title: 'Name',
            searchable: true,
            sortable: true,
          },
          {
            id: 'god',
            title: 'God',
            sortable: true,
          },
          {
            id: 'rarity',
            title: 'Rarity',
            sortable: true,
          },
          {
            id: 'mana',
            title: 'Mana',
            sortable: true,
          },
          {
            id: 'set',
            title: 'Set',
            sortable: true,
          },
          {
            id: 'type',
            title: 'Type',
            sortable: true,
          },

          {
            id: 'health',
            title: 'Health',
            sortable: true,
          },
          {
            id: 'attack',
            title: 'Attack',
            sortable: true,
          },
        ],
      }),
    ],
  });
}
