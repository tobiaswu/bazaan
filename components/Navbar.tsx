import { SignInButton } from './SignInButton';

export interface Props {}

export const Navbar = ({}: Props) => {
  return (
    <header className="text-gray-600">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">APP_NAME</span>
        </a>
        <div className="md:ml-auto">
          <SignInButton />
        </div>
      </div>
    </header>
  );
};
