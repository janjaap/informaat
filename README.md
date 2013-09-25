informaat
=========

Informaat job application demo page

_Note: this page has not been tested on a Windows platform as well as Windows browsers_

## Installation

Getting a development environment up and running is relatively straightforward.

### Dependencies

Before you start, you need to have the following installed. These are not dependencies for the application itself, but they are dependencies for getting the development environment to work. Note that the dependencies have been tested on OSX 10.8 and not in a Windows environment.

* [Ruby](http://www.ruby-lang.org/en/downloads/)
* [Vagrant 1.2.2](http://downloads.vagrantup.com/)
* [Oracle VirtualBox 4.2.16](https://www.virtualbox.org/wiki/Downloads)

### Clone the repository

Clone the repository on your local machine.

    git clone --recursive git@github.com:WEBclusive/informaat.git informaat

### Initialize the vagrant instance

Change into the directory of the informaat repository, and bring up the vagrant instance.

    cd informaat
    vagrant up

Running this for the first time can take a while to complete. Once the command completes you should have a development server running on your local machine.

### Accessing the instance

The site is accessible by visiting `http://informaat.dev` in your browser (make sure this hostname points to 33.33.33.10 in your hosts file). You can SSH into the instance by running the following from the directory where you cloned the repository.

    vagrant ssh
  
## Compiling stylesheets

All style rules are located in the `src/scss` folder and, when compiled, will be accessible from `public/css/informaat.css`. If ruby, sass, compass as well as sass-globbing are installed outside the vagrant instance, the css can be compiled by running `./compile_scss.sh` from the command line. If those dependencies have not been installed, you can ssh into the instance (as described above) and run the same command.
