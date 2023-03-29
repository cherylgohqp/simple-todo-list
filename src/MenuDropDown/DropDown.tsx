import React, { useEffect, useState } from 'react';
import "./DropDown.scss";
import options from "./options";


type DropDownProps = {
  targetTypes: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  targetTypeSelection: Function;
};

export const DropDown: React.FC<DropDownProps> = ({
  targetTypes,
  targetTypeSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  // console.log(targetTypeSelection, targetTypes)
  /**
   * Handle passing the target type selected
   * back to the parent component
   *
   * @param targetType  The selected target Type
   */
  const onClickHandler = (targetType: string): void => {
    targetTypeSelection(targetType); //for modalheader, since modalheader===targettype 
    console.log(`clicked on ${targetType}`)
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {/* maybe can add the category stuff here? */}
        {targetTypes.map(
          (targetType: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(targetType);
                }}
              >
                {targetType}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

