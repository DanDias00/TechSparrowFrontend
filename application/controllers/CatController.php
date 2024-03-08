<?php
class CatController extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('CatModel');
        $this->load->library('session');
    }

    public function index() {
        // Display the cat view with data from the model
        $this->load->view('CatView');
    }

    public function vote() {
        // Process a vote
        $vote = $this->input->post('vote');
        $id = $this->input->post('id');

        if ($this->CatModel->vote($vote, $id)) {
            // Redirect after voting
            redirect('CatController/index');
        } else {
            // Handle the error
        }
    }
}
