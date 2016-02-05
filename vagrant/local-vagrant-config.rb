# -*- mode: ruby -*-
# vi: set ft=ruby :

#BASIC LOCAL GUEST CONFIGURATION
LOCAL_ARGS = {
	"guest_ip" => '192.168.1.240',
	"guest_hostname" => 'ecos.dev',
	"app_root" => 'public',
	"client_root" => 'client'
}

#ADDITIONAL FANCYPANTS VAGRANT CONFIG
# Vagrant.configure(2) do |config|
# 	config.ssh.forward_agent = true
# 	config.vm.provider "virtualbox" do |v|
# 	  v.memory = 2048
# 	  v.cpus = 2
# 	end
# end
