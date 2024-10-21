package com.example.firebaseapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.firebaseapp.repository.PessoaRepository
import com.example.firebaseapp.ui.screen.CadastroScreen
import com.example.firebaseapp.ui.screen.ConsultaScreen
import com.example.firebaseapp.ui.theme.FirebaseAppTheme
import com.example.firebaseapp.viewmodel.PessoaViewModel
import com.google.firebase.firestore.FirebaseFirestore

class MainActivity : ComponentActivity() {

    private val db by lazy {
        FirebaseFirestore.getInstance()
    }

    private val pessoaViewModel: PessoaViewModel by viewModels {
        PessoaViewModel.Factory(PessoaRepository(db))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FirebaseAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation(pessoaViewModel)
                }
            }
        }
    }
}

@Composable
fun AppNavigation(pessoaViewModel: PessoaViewModel) {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "cadastro") {
        composable("cadastro") {
            CadastroScreen(pessoaViewModel, navController)
        }
        composable("consulta") {
            ConsultaScreen(pessoaViewModel, navController)
        }
    }
}

