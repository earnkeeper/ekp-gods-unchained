import {
  Col,
  collection,
  Container,
  Datatable,
  documents, isBusy,
  PageHeaderTile,
  Row, UiElement
} from '@earnkeeper/ekp-sdk';
import { HistoryDocument } from './history.document';
  
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
                  title: 'Player History',
                  icon: 'cil-history',
                }),
              ],
            }),
          ],
        }),
        historyRow(),
      ],
    });
  }
  
function historyRow(): UiElement {
  return Datatable({
    defaultSortFieldId: 'created_date',
    defaultSortAsc: true,
    defaultView: {
      xs: 'grid',
      lg: 'column',
    },
    data: documents(HistoryDocument),
    busyWhen: isBusy(collection(HistoryDocument)),
    columns: [
      {
        id: 'name',
      },
    ],
  });
}


  
