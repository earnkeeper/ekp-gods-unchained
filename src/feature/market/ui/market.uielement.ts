import {
  Col,
  Container,
  Fragment,
  PageHeaderTile,
  Row,
  UiElement,
} from '@earnkeeper/ekp-sdk';
export default function element(): UiElement {
  return Container({
    children: [titleRow()],
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
                title: 'Marketplace',
                icon: 'cil-cart',
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
