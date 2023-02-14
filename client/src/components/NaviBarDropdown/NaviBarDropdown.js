import { NavDropdown } from 'react-bootstrap';

import { randomNumber } from './../../utils/Random';

const sampleDropdownConfig = [
  {
    itemLink: '/link1',
    itemName: 'Link 1',
  },
  {
    itemLink: '/link2',
    itemName: 'Link 2',
  },
  {
    isDivider: true,
  },
  {
    itemLink: '/link3',
    itemName: 'Link 3',
  },
];

function NaviBarDropdown({
  dropdownConfig = sampleDropdownConfig,
  title = '',
}) {
  return (
    <NavDropdown title={title}>
      {dropdownConfig.map((dropdownItem) => {
        const { itemLink, itemName, isDivider } = dropdownItem;
        return isDivider ? (
          <NavDropdown.Divider key={randomNumber()} />
        ) : (
          <NavDropdown.Item key={randomNumber()} href={itemLink}>
            {itemName}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
}

export default NaviBarDropdown;
