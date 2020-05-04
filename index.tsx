import React from 'react';
import { observer } from 'mobx-react';
​
import FamilyMember from '../FamilyMember';
import { generateTreeFunction } from '../../helpers';
import { PreparedData } from '../../store';
import MemberLink from '../MemberLink';
​
​
interface FamilyGroupProps {
    familyTreeData: PreparedData;
}
​
const width = 980;
​
const tree = generateTreeFunction(width);
​
const FamilyGroup = ({ familyTreeData }: FamilyGroupProps) => {
    const {
        tree: root,
        dx,
        dy,
    } = tree(familyTreeData);
    const links = root.links();
​
  const renderLinks = () => links.map((data) => (
      <MemberLink linkData={data} key={data.target.x + data.target.y} />
  ));
​
  const renderMembers = () => root.descendants().map((d: any, i: number) => (
      <FamilyMember key={d.data.member.firstName} node={d} index={i} />
  ));

  let x0 = Infinity;
    let x1 = -x0;

  root.each((d: any) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
  });

  return (
      <svg viewBox={`0,0, ${width}, ${x1 - x0 + dx * 2}`}>
          <g fontFamily="arial" fontSize={18} transform={`translate(${dy / 3},${dx - x0})`}>
              <g fill="none" stroke="#555" strokeOpacity={0.4} strokeWidth={1.5}>
                  {renderLinks()}
              </g>
              <g strokeLinejoin="round" strokeWidth={3}>
                  {renderMembers()}
              </g>
          </g>
      </svg>
  );
};

export default observer(FamilyGroup);
